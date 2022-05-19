HTMLFormElement.prototype.save = function(){

    let form = this;

    return new Promise ((resolve, reject) =>{

      form.addEventListener('submit', e => {

        e.preventDefault();
        let formCreateData = new FormData(formCreate);
    
        fetch(form.action, {
          method:form.method,
          body: formData
        }).then(response => response.json()).then(json =>{
    
          resolve(json);
    
        }).catch(err=>{

          reject(err);

        });//catch
    
      });//form create

    });//new promise

}//html form element