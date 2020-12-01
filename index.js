const jsonFile = require('jsonfile');
const moment = require('moment');
const simpleGit = require('simple-git');
const random = require('random');
const filePath = './data.json';


const makeFakeCommit = (times) => {
    if(times === 0) 
        return simpleGit().push();
    const x = random.int(0, 54);
    const y = random.int(0, 6);
    console.log(x, y);
    const DATE = moment().subtract(1,'y')
                         .add(1,'d')
                         .add(x, 'w')
                         .add(y, 'd')
                         .format();

    const data = {
        date : DATE
    };
    console.log(DATE);
    jsonFile.writeFile(filePath, data, ()=>{
        simpleGit().add([filePath]).commit(DATE, {'--date': DATE}, 
        makeFakeCommit.bind(this, --times)
        )
    });    
};

makeFakeCommit(100);