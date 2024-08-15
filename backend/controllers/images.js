const path = require('path');
const fs = require('fs');
const imagesController = {
    getAllImages: async function (req, res) {
        const data =Object.fromEntries(fs.readdirSync(path.resolve(__dirname,"../static/images"), { withFileTypes: true })
            .map(({name})=>{
                const key = name.split('.')[0];
                return [key,"/images/"+name];
            }));
        res.send(JSON.stringify(data));
    }
}

module.exports = imagesController;
