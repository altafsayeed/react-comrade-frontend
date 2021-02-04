import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";
//MUI stuff
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DeleteForeverTwoToneIcon from "@material-ui/icons/DeleteForeverTwoTone";

import { connect } from "react-redux";
import { deletePing } from "../../redux/actions/dataActions";

const styles = {
  deleteButton: {
    position: "absolute",
    left: "91%",
    top: "8.5%",
  },
};

class DeletePing extends Component {
  state = {
    open: false,
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  deletePing = () => {
    this.props.deletePing(this.props.pingId);
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <MyButton
          tip="Delete ping"
          onClick={this.handleOpen}
          buttonClassName={classes.deleteButton}
        >
          <DeleteForeverTwoToneIcon color="secondary" fontSize="large" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Are you sure you want to delete this ping?</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => {
                this.deletePing();
                setTimeout(function () {
                  window.location.reload();
                }, 500);
              }}
              color="secondary"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

DeletePing.propTypes = {
  deletePing: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  pingId: PropTypes.string.isRequired,
};

export default connect(null, { deletePing })(withStyles(styles)(DeletePing));
