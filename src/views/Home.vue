<template>
  <div class="main">
    <div class="container-fluid">
      <div class="row">
        <div class="col header">
          <h1>Welcome to ProDev </h1>
          <h4>The productivity tool for small teams</h4>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-md-8 image">
          <img src="@/assets/images/1.png" alt="dashboard image">
        </div>
        <div class="col-12 col-md-4 info">
          <div class="line">
            <span class="material-icons">fiber_manual_record</span>
            <h5>Fully featured on mobile and desktop</h5>
          </div>
          <div class="line">
            <span class="material-icons">fiber_manual_record</span>
            <h5>Birds eye view of team projects</h5>
          </div>
          <div class="line">
            <span class="material-icons">fiber_manual_record</span>
            <h5>Keyword project search</h5>
          </div>
          <div class="line">
            <span class="material-icons">fiber_manual_record</span>
            <h5>Quickly toggle the real-time side-chat</h5>
          </div>
        </div>
      </div>
      <div class="divider"></div>
      <div class="row">
        <div class="col-12 col-md-4 info">
          <div class="line">
            <span class="material-icons">fiber_manual_record</span>
            <h5>Click user name in the top right bar to toggle theme</h5>
          </div>
          <div class="line">
            <span class="material-icons">fiber_manual_record</span>
            <h5>Add new user projects and tasks</h5>
          </div>
          <div class="line">
            <span class="material-icons">fiber_manual_record</span>
            <h5>View team members projects and tasks</h5>
          </div>
          <div class="line">
            <span class="material-icons">fiber_manual_record</span>
            <h5>Views for both user projects and team projects</h5>
          </div>
        </div>
        <div class="col-12 col-md-8 image">
          <img src="@/assets/images/2.png" alt="dashboard image">
        </div>
      </div>
      <div class="divider"></div>
      <div class="row">
        <div class="col-12 col-md-8 image">
          <img src="@/assets/images/3.png" alt="dashboard image">
        </div>
        <div class="col-12 col-md-4 info">
          <div class="line">
            <span class="material-icons">fiber_manual_record</span>
            <h5>All data stored and retrieved from Firebase real-time cloud storage</h5>
          </div>
          <div class="line">
            <span class="material-icons">fiber_manual_record</span>
            <h5>Project owner can add/delete tasks</h5>
          </div>
          <div class="line">
            <span class="material-icons">fiber_manual_record</span>
            <h5>On completion the project owner can remove the project</h5>
          </div>
        </div>
      </div>
      <div class="divider"></div>
      <div class="row">
        <div class="col-12 col-md-4 info">
          <div class="line">
            <span class="material-icons">fiber_manual_record</span>
            <h5>All team members can contribute and share issues and solutions within the bug journal</h5>
          </div>
          <div class="line">
            <span class="material-icons">fiber_manual_record</span>
            <h5>Bugs can be keyword searched</h5>
          </div>
        </div>
        <div class="col-12 col-md-8 image">
          <img src="@/assets/images/4.png" alt="dashboard image">
        </div>
      </div>
      <div class="divider"></div>
      <div class="row">
        <div class="col-12 col-md-8 image">
          <img src="@/assets/images/5.png" alt="dashboard image">
        </div>
        <div class="col-12 col-md-4 info">
          <div class="line">
            <span class="material-icons">fiber_manual_record</span>
            <h5>Upload solution image</h5>
          </div>
          <div class="line">
            <span class="material-icons">fiber_manual_record</span>
            <h5>Only issuer can set the bug to solved</h5>
          </div>
          <div class="line">
            <span class="material-icons">fiber_manual_record</span>
            <h5>Right-click solution image to view in new browser tab</h5>
          </div>
        </div>
      </div>
      <div class="divider"></div>
    </div>
  </div>
</template>

<script>


export default {
  name: 'Home',
  components: {}
}
</script>

<style scoped>
.main{
  flex:1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  justify-content: stretch;
  min-height: 100vh;
  background: rgb(70, 70, 70);
  box-shadow: 0px 0px 100px rgba(50,50,50,0.4);
  border-radius: 8px;
}
.divider{
  height: 2px;
  width: 90vw;
  background: rgb(100,100,100,0.3);
  margin: 40px auto;
}

.header{
  /* background: blueviolet; */
  min-height: 100px;
  flex:1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px auto 40px auto;
}
.header h1{
  text-align: center;
  font-weight: 300;
  margin: 15px auto;
}
.header h4{
  text-align: center;
  font-weight: 600;
  margin: 0 auto 15px auto;
}

.info{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
div.line span{
  font-size: 20px;
  margin: auto 0 auto 10px;
}
div.line{
  width: 100%;
  /* flex:1; */
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 10px auto;
}
div.line h5{
  margin: auto auto auto 20px;
}

.image{
  /* background: chocolate; */
  /* min-height: 300px; */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
.image img{
  width: 100%;
  border-radius: 8px;
}
</style>