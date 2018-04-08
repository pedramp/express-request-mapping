
exports.logout = function(req, res) {
    /**
     * @get:/logout
     */
    
    //TODO: remove session and logout 
    res.redirect('/admin/login/');
}


exports.dashboard = function(req, res) {
    /**
     * @basicAuth:
     * @customLog:
     * @all:/dashboard/home
     */
    

    res.json({message:'Hello World...'});
}


exports.now = function(req, res) {
    /**
     * @customLog:
     * @get:/now
     * @post:/now
     */
    
    res.end( new Date().toJSON() );
}


