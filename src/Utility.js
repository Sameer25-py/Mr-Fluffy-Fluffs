const mongoose = require('mongoose');

const getOne = (model,id) => {
  return new Promise((res,rej) => {
    try {
      model.findOne(id, (err,result) => {
        if(err) {
           rej({status:'False',msg:'Internal Database Error.'})
        }
        else {
          if(result) {
            res(result)
          }
          else {
            rej({status:'False',msg:'Requested data not present.'})
          }
        }
      });
    }
    catch(Error) {
       rej({status:'False',msg:'Internal Server Error.'})
    }
  });
};

const getAll = (model,id) => {
  return new Promise((res,rej) => {
    try {
      model.find(id, (err,result) => {
        if(err) {
           rej({status:'False',msg:'Internal Database Error.'})
        }
        else {
          if(result) {
            res(result)
          }
          else {
            rej({status:'False',msg:'Requested data not present.'})
          }
        }
      });
    }
    catch(Error) {
       rej({status:'False',msg:'Internal Server Error.'})
    }
  });
};

const patchOne = (model,id,patched_data,options) => {
  return new Promise((res,rej) => {
    try {
      model.updateOne(id,patched_data,options, (err,result) => {
        if(err) {
           rej({status:'False',msg:'Internal Database Error.'})
        }
        else {
          if(result.nModified) {
            res(result)
          }
          else {
            rej({status:'False',msg:'Data cannot be updated.'})
          }
        }
      });
    }
    catch(Error) {
       rej({status:'False',msg:'Internal Server Error.'})
    }
  });
};

const patchAll = (model,id,patched_data,options) => {
  return new Promise((res,rej) => {
    try {
      model.updateMany(id,patched_data,options, (err,result) => {
        if(err) {
           rej({status:'False',msg:'Internal Database Error.'})
        }
        else {
          if(result.nModified) {
            res(result)
          }
          else {
            rej({status:'False',msg:'Data cannot be updated.'})
          }
        }
      });
    }
    catch(Error) {
       rej({status:'False',msg:'Internal Server Error.'})
    }
  });
};


const removeOne = (model,id) => {

  return new Promise((res,rej) => {
    try {
      model.deleteOne(id,(err,result) => {
        if(err) {
          rej({status:'False',msg:'Internal Database Error.'});
        }
        else {
          if(result.deletedCount) {
            res(result);
          }
          else {
            rej({status:'False',msg:'Cannot delete requested data.'});
          }
        }
      });
    }
    catch(Error) {
      rej({status:'False',msg:'Internal Server Error.'});
    }
  });

}

const removeAll = (model,id) => {

  return new Promise((res,rej) => {
    try {
      model.deleteMany(id,(err,result) => {
        if(err) {
          rej({status:'False',msg:'Internal Database Error.'});
        }
        else {
          if(result.deletedCount) {
            res(result);
          }
          else {
            rej({status:'False',msg:'Cannot delete requested data.'});
          }
        }
      });
    }
    catch(Error) {
      rej({status:'False',msg:'Internal Server Error.'});
    }
  });

}


const put = (model,data) => {
  return new Promise((res,rej) => {
    try {
      let newModel = new model(data);
      newModel.save((err,result) => {
        if(err) {
          rej({status:'False',msg:'Internal Database Error.'});
        }
        else {
          if(result) {
            res(result);
          }
          else {
            rej({status:'False',msg:'Cannot add data.'});
          }
        }
      });
    }
    catch(Error) {
      rej({status:'False',msg:'Internal Server Error.'});
    }
  });
}

module.exports = {getOne,getAll,patchOne,removeOne,put}
