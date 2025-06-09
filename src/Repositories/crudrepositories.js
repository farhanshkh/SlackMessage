export default function crudrepositories(model) {
  return {
    create: async function (data) {
      const newDoc = await model.create(data);
      return newDoc;
    },
    getallrecord: async function () {
      const alldoc = await model.find();
      return alldoc;
    },
    getById: async function (id) {
      const doc = await model.findById(id);
      return doc;
    },
    delete: async function (id) {
      const response = await model.findByIdAndDelete(id);
      return response;
    },
    update: async function (data, id) {
      const updateDoc = await model.findByIdAndUpdate(id, data, {
        new: true
      });
      return updateDoc;
    }
  };
}

// const crudrepositories = crudrepositories(User);
// export default crudrepositories;

// you can call like this give the user schema

//you can create repositories function and create the new instance of that and use .call to bind user to the schema

// function repositories() {
//   crudrepositories.call(this, User);
// }

// export default new repositories();


//going with function creating a inhertance just create object

