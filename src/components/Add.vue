<template>
  <div class="container">
    <div class="card">
      <div class="card-header">Add Task</div>
      <div class="card-body">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="task_name"
            label="Name of your task"
            required
            prepend-icon="mdi-account"
          ></v-text-field>

          <v-textarea
            v-model="description"
            label="Description"
            required
            prepend-icon="mdi-pencil"
          ></v-textarea>

          <v-col cols="12" sm="6" md="4">
            <v-dialog
              ref="dialog"
              v-model="modal"
              :return-value.sync="date"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="date"
                  label="Due date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="date" scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="modal = false">
                  Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.dialog.save(date)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-dialog>
          </v-col>

          <v-btn primary class="mr-4" @click="addToDo"> Submit </v-btn>

          <v-btn primary class="mr-4" @click="reset"> Reset </v-btn>

          <v-btn primary class="mr-4" @click="cancel"> Cancel </v-btn>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "@/main";

export default {
  data: () => ({
    showPicker: false,
    selectedDate: null,
    valid: true,
    task_name: "",
    description: "",
    date: null,
  }),

  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    submit() {
      console.log(">>>>", this.task_name, this.description, this.date);
    },
    cancel() {
      console.log(">>>>cancel");
      this.$router.push("Dashboard");
    },
    addToDo: function () {
      this.errors = "";
      db.collection("tasks")
        .add({
          task_name: this.task_name,
          description: this.description,
          due_date: this.date,
        })
        .then((response) => {
          if (response) {
            this.task_name = "";
            this.description = "";
            this.due_date = "";
          }
        })
        .catch((error) => {
          this.errors = error;
        });
    },
  },
};
</script>