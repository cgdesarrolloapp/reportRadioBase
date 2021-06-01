module.exports = {
    configureWebpack :{
        devServer : {
            proxy :{
                '/api' : {
                    target :'https://testnodeapp01.herokuapp.com/'
                }
            }
        }
    }

}