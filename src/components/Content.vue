<template>
<div class = "container">
  <div class="row pt-5">
      <div class="col-md-5">
        <div class="card">
          <div class="card-body">
            <form @submit.prevent="addTask">
              <div class="form-group">
                <input class="form-control form-control-lg" type="text" v-model="task.title" placeholder="ingrese el proceso" />
              </div>
              <div class="form-group">
                <textarea  v-model="task.description" class="form-control" id="Textarea1" rows="10"  placeholder="ingrese la descripcion"></textarea>
              </div>
              <template v-if="edit === false">
                <button type="button" class="btn btn-info btn-block">Enviar</button>
              </template>
              <template v-else>
                <button type="button" class="btn btn-info btn-block">Actualizar</button>
              </template>
            </form>
          </div>
        </div>
      </div>
        <div class="col-md-7">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Proceso</th>
                        <th>Descripcion</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="">
                      <td>{{task.title}}</td>
                      <td>{{task.description}}</td>
                      <td>
                        <button @click="deleteTask(task._id)" class="btn btn-danger">
                            Borrar
                        </button>
                        <button @click="editTask(task._id)" class="btn btn-secondary">
                            Editar
                        </button>
                      </td>
                    </tr>
                </tbody>
            </table>
        </div>
      </div>
    </div>
</template>

<script>


export default {
    name: 'Content',
    data() {
      return {
        task: {
          title: '',
          description: ''
        },
        tasks: [],
        edit: false,
        taskToEdit: ''
      }
    },
    created() {
      this.getTask();
    },
    methods: {
      addTask(){
        if(this.edit === false) {
          fetch('/api/tasks', {
            method: 'POST',
            body: JSON.stringify(this.task),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })    // solicitar datos y enviar al servidor
            .then(res => res.json())
            .then(data =>{ this.getTasks();
          })
        } else {
          fetch('/api/tasks/' + this.taskToEdit, {
            method: 'PUT',
            body: JSON.stringify(this.task),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })
              .then(res => res.json())
              .then(data => {
                this.getTask();
                this.edit = false;
              });
        }
            this.task = new Task();

      },
        getTask() {
          fetch('/api/tasks')
            .then(res => res.text())
            .then(data => {
                this.tasks = data;
                console.log(this.tasks)
            });
          },
          deleteTask(id) {
              fetch('/api/tasks/' + id, {
                method: 'DELETE',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }
              })
              .then(res => res.json())
              .then(data => console.log(data));
          },
          editTask(id) {
            fetch('/api/tasks/' + id)
              .then(res => res.json())
              .then(data => {
                  this.task = new Task(data.title, data.description);
                  this.taskToEdit = data._id;
                  this.edit = true;
              });
          }
        }
      }
</script>
