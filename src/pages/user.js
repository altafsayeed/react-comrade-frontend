import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Ping from "../components/ping/Ping";
import StaticProfile from "../components/profile/StaticProfile";
import Grid from "@material-ui/core/Grid";

import PingSkeleton from "../util/PingSkeleton";
import ProfileSkeleton from "../util/ProfileSkeleton";

import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";

class user extends Component {
  state = {
    profile: null,
    pingIdParam: null,
  };
  componentDidMount() {
    const handle = this.props.match.params.handle;
    const pingId = this.props.match.params.pingId;

    if (pingId) this.setState({ pingIdParam: pingId });

    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        this.setState({
          profile: res.data.user,
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    const { pings, loading } = this.props.data;
    const { pingIdParam } = this.state;

    const pingsMarkup = loading ? (
      <PingSkeleton />
    ) : pings === null ? (
      <p>No pings from this user</p>
    ) : !pingIdParam ? (
      pings.map((ping) => <Ping key={ping.pingId} ping={ping} />)
    ) : (
      pings.map((ping) => {
        if (ping.pingId !== pingIdParam)
          return <Ping key={ping.pingId} ping={ping} />;
        else return <Ping key={ping.pingId} ping={ping} openDialog />;
      })
    );

    return (
      <Grid container spacing={10}>
        <Grid item sm={8} xs={12}>
          {pingsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getUserData })(user);
