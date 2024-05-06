let urlparamss = new URLSearchParams(location.search);
var virtualtourid = urlparamss.get("virtualtourid");
       
AFRAME.registerComponent('hellomoto', {
schema: {
  title: {default: 'sagar'},
},
init: function () {
  var el = this.el;
  el.setAttribute('renderer', {colorManagement: true});
  el.setAttribute('webxr', {optionalFeatures: 'hit-test, local-floor'});
  this.initEntities();

  this.onTouchMove = this.onTouchMove.bind(this);
  this.onTouchEnd = this.onTouchEnd.bind(this);
  
  this.el.sceneEl.canvas.oncontextmenu = function (evt) { evt.preventDefault(); };
  

  // Mobile 2D controls.
  document.addEventListener('touchend', this.onTouchEnd);
  document.addEventListener('touchmove', this.onTouchMove);
  
},
initEntities: function () {

 //the id of the modal who can change
 var modelPivotEl = this.modelPivotEl =  document.getElementById('modelPivotcard');


},


tick: function () {
  var modelPivotEl = this.modelPivotEl;
  var intersection;
  var intersectionPosition;
  if (!this.el.sceneEl.is('vr-mode')) { return; }
  if (!activeHandEl) { return; }
  
  modelPivotEl.object3D.rotation.y -= (this.oldHandX - intersectionPosition.x) / 4;
  modelPivotEl.object3D.rotation.x += (this.oldHandY - intersectionPosition.y) / 4;

  this.oldHandX = intersectionPosition.x;
  this.oldHandY = intersectionPosition.y;
},



onTouchMove: function (evt) {

  if (evt.touches.length === 1) { this.onSingleTouchMove(evt); }
  if (evt.touches.length === 2) { this.onPinchMove(evt); }
},

onSingleTouchMove: function (evt) {
  
  var dX;
  var dY;
  var modelPivotEl = this.modelPivotEl;
  this.oldClientX = this.oldClientX || evt.touches[0].clientX;
  this.oldClientY = this.oldClientY || evt.touches[0].clientY;

  dX = this.oldClientX - evt.touches[0].clientX;
  dY = this.oldClientY - evt.touches[0].clientY;
  

  modelPivotEl.object3D.rotation.y -= dX / 200;
  this.oldClientX = evt.touches[0].clientX;

  modelPivotEl.object3D.rotation.x -= dY / 100;

  // Clamp x rotation to [-90,90]
  modelPivotEl.object3D.rotation.x = Math.min(Math.max(-Math.PI / 2, modelPivotEl.object3D.rotation.x), Math.PI / 2);
  this.oldClientY = evt.touches[0].clientY;
},

onPinchMove: function (evt) {
  var dX = evt.touches[0].clientX - evt.touches[1].clientX;
  var dY = evt.touches[0].clientY - evt.touches[1].clientY;
  var modelPivotEl = this.modelPivotEl;
  var distance = Math.sqrt(dX * dX + dY * dY);
  var oldDistance = this.oldDistance || distance;
  var distanceDifference = oldDistance - distance;
  var modelScale = this.modelScale || modelPivotEl.object3D.scale.x;
  

  modelScale -= distanceDifference / 500;
  modelScale = Math.min(Math.max(0.8, modelScale), 20.0);
  // Clamp scale.
  modelPivotEl.object3D.scale.set(modelScale, modelScale, modelScale);

  this.modelScale = modelScale;
  this.oldDistance = distance;
},

onTouchEnd: function (evt) {
  this.oldClientX = undefined;
  this.oldClientY = undefined;
  if (evt.touches.length < 2) { this.oldDistance = undefined; }
},

});