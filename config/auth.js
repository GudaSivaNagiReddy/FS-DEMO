module.exports = {
	/**
	* Ensuring authentication
	*/
	ensureAuthenticated: function(req, res, next) {
	if (req.isAuthenticated()) {
		res.json({
            msg:"success"
        })
        return next();

	}
	req.flash('error_msg', 'Please log in to view that resource');
	res.redirect('/users/login');
	},
	forwardAuthenticated: function(req, res, next) {
	if (!req.isAuthenticated()) {
		return next();
	}
	res.json({
        msg:"fail to authentication"
    })
	res.redirect('/'); 
	}
};
