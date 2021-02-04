import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom/";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
//MUI stuff
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
//Icons
import NotificationsActiveOutlinedIcon from "@material-ui/icons/NotificationsActive";
import ThumbUpRoundedIcon from "@material-ui/icons/ThumbUpRounded";
import ChatIcon from "@material-ui/icons/Chat";
//Redux
import { connect } from "react-redux";
import { markNotificationsRead } from "../../redux/actions/userActions";

class Notifications extends Component {
  state = {
    anchorEl: null,
  };
  handleOpen = (event) => {
    this.setState({ anchorEl: event.target });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  onMenuOpened = () => {
    let unreadNotificationsIds = this.props.notifications
      .filter((notif) => !notif.read)
      .map((notif) => notif.notificationId);
    this.props.markNotificationsRead(unreadNotificationsIds);
  };
  render() {
    const notifications = this.props.notifications;
    const anchorEl = this.state.anchorEl;

    dayjs.extend(relativeTime);

    let notifIcon;
    if (notifications && notifications.length > 0) {
      notifications.filter((notif) => notif.read === false).length > 0
        ? (notifIcon = (
            <Badge
              badgeContent={
                notifications.filter((notif) => notif.read === false).length
              }
              color="secondary"
            >
              <NotificationsActiveOutlinedIcon fontSize="large" />
            </Badge>
          ))
        : (notifIcon = <NotificationsActiveOutlinedIcon fontSize="large" />);
    } else {
      notifIcon = <NotificationsActiveOutlinedIcon fontSize="large" />;
    }
    let notificationsMarkup =
      notifications && notifications.length > 0 ? (
        notifications.map((notif) => {
          const verb = notif.type === "like" ? "liked" : "commented on";
          const time = dayjs(notif.createdAt).fromNow();
          const iconColor = notif.read ? "primary" : "secondary";
          const icon =
            notif.type === "like" ? (
              <ThumbUpRoundedIcon
                color={iconColor}
                style={{ marginRight: 10 }}
              />
            ) : (
              <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
            );

          return (
            <MenuItem key={notif.createdAt} onClick={this.handleClose}>
              {icon}
              <Typography
                component={Link}
                color="default"
                variant="body1"
                to={`/users/${notif.recipient}/ping/${notif.pingId}`}
              >
                {notif.sender} {verb} your ping {time}
              </Typography>
            </MenuItem>
          );
        })
      ) : (
        <MenuItem onClick={this.handleClose}>No notifications yet</MenuItem>
      );
    return (
      <Fragment>
        <Tooltip placement="top" title="Notifications">
          <IconButton
            aria-owns={anchorEl ? "simple-menu" : undefined}
            aria-haspopup="true"
            onClick={this.handleOpen}
          >
            {notifIcon}
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          onEntered={this.onMenuOpened}
        >
          {notificationsMarkup}
        </Menu>
      </Fragment>
    );
  }
}

Notifications.propTypes = {
  markNotificationsRead: PropTypes.func.isRequired,
  notifications: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  notifications: state.user.notifications,
});

export default connect(mapStateToProps, { markNotificationsRead })(
  Notifications
);
