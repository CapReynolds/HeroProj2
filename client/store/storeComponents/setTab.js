/* eslint no-underscore-dangle: 'off' */
/* eslint no-console: 'off' */

// action types
const SET_TAB = 'SET_TAB';

// action creator
const _setTab = (tab) => ({
  type: SET_TAB,
  tab,
});

// thunk
const setTab = (tab) => async (dispatch) => {
  try {
    const payload = {
      tab
    };

    dispatch(_setTab(tab));
    //window.location.reload();
  } catch (err) {
    console.log(err.response);
  }
};
export { setTab, SET_TAB };
