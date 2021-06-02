/* eslint-disable */
export default{
  getUrlKey: function (name) {
      return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
  },
  // alert: function (msg){
  //   alert(msg)
  // },
  // snackbar: (msg) => {
  //   console.log(msg);
  //   // this.$store.dispatch("snackbar/openSnackbar", {
  //   //   msg: msg,
  //   // });
  // }
}