import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

import Ping from "../components/ping/Ping";
import Profile from "../components/profile/Profile";
import PingSkeleton from "../util/PingSkeleton";

import { connect } from "react-redux";
import { getPings } from "../redux/actions/dataActions";

class home extends Component {
  componentDidMount() {
    this.props.getPings();
  }
  render() {
    const { pings, loading } = this.props.data;
    let recentPingsMarkup = !loading ? (
      pings.map((ping) => <Ping key={ping.pingId} ping={ping} />)
    ) : (
      <PingSkeleton />
    );
    return (
      <Grid container spacing={10}>
        <Grid item sm={8} xs={12}>
          {recentPingsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getPings: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getPings })(home);
