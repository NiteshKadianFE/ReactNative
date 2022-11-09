import Realm from "realm";

export const TODO_SCHEMA = "Todob";

const TodoSchema = {
    name: TODO_SCHEMA,
    properties: {
    //   _id: "int",
      description: "string",
      expiry: "string?",
      status: 'string?',
      type: 'string?',
      user: 'string?'
    },
    primaryKey: "description",
};

const databaseOptions = {
    path: 'todoListApp.realm',
    schema: [TodoSchema]
}

export const insertNewTodo = newTodo => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.create(TODO_SCHEMA, newTodo);
            resolve(newTodo);
        })
    }).catch((error) => {
        reject(error);
    })
})

export const queryAllTodos = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        let allTodos = realm.objects(TODO_SCHEMA);
        // console.log(allTodos);
        resolve(allTodos);
    }).catch(error => {
        reject(error);
    })
})

export const deleteAllTodos = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        let allTodos = realm.objects(TODO_SCHEMA);
        // console.log(allTodos);
        allTodos.forEach(todo=>{
            realm.write(() => {
                realm.delete(todo);
            });
        })
        resolve(allTodos);
    }).catch(error => {
        reject(error);
    })
})


export const updateTodo = newTodo => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            newTodo.status = JSON.stringify(!JSON.parse(newTodo.status))
        });
        resolve(newTodo);
    }).catch((error) => {
        reject(error);
    })
})















// import Realm from "realm";

// const SCHEMA_VERSION = 1

// const TodoSchema = {
//     name: "Tasks",
//     properties: {
//         id: "int",
//         description: "string",
//         dueDate: "string?",
//         createdAt: "string?",
//         status: "string?"
//     },
//     primaryKey: "id"
// }

// const schema = [Tasks]

// (async ()=> {
// const realm = await Realm.open({
//     path: "myrealm",
//     schema: [TodoSchema],
//   });

//   realm.write(() => {
//     task1 = realm.create("Task", {
//       id: 1,
//       description: "go grocery shopping",
//       createdAt: Date.now(),
//       status: "Open",
//     });
//     task2 = realm.create("Task", {
//       id: 2,
//       description: "go exercise",
//       createdAt: Date.now(),
//       status: "Open",
//     });
//     console.log(`created two tasks: ${task1.name} & ${task2.name}`);
//   });
// })();
// export function getRealmPath() {
//     return realm.path
// }