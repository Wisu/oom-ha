const actions = {

    initInfo: (data) => ({
    	Generated : data.Generated,
    	Games : data.Games,
    	Result : data.Result,
  		selPlayer : {},
  		selGame: {}
	}),

  selGame: (date) => (state) => ({
	    	Generated : state.Generated,
	    	Games : state.Games,
	    	Man : state.Man,
	    	Kvinna : state.Kvinna,
	  		selPlayer : {},
	  		selGame: state.Games.find(item => item.Date === date)
		}
	),

    selPlayer: (pid) => (state) => ({    
    	Generated : state.Generated,
    	Games : state.Games,
    	Man : state.Man,
    	Kvinna : state.Kvinna,
  		selPlayer : state.Result.find(item => item.Id === pid),
  		selGame: {}
	})
};

export default actions;
