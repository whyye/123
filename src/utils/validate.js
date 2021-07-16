//验证邮箱

export function validateSomeMail (value){
  let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;

  return !reg.test(value) ? true : false
}

// 验证密码 

export function  validateSomePass(value){

  let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S]{8,16}$/

  return !reg.test(value) ? true : false
}

// 验证 验证码

export function validateSomeCode (value){

  let reg = /^[a-z0-9]{6}$/;
  return !reg.test(value) ? true : false;
}

//过滤特殊字符

export function  filterStr(str) {
      var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{ }【】‘；：”“'。，、？]")
      var rs = "";
      for (var i = 0; i < str.length; i++) {
              rs = rs + str.substr(i, 1).replace(pattern, '');
          }
      return rs;
 }
  