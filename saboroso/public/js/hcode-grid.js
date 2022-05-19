class HcodeGrid {

    constructor(configs){

        configs.listeners = Object.assign({
        
            afterUpdateClick:(e) => {
        
                $('modal-update').modal('show');
        
              }//after update click
        
        }, configs.listeners);


        this.options = Object.assign({}, {
            formCreate: '#modal-create form',
            formUpdate: '#modal-update form',
            btnUpdate: '.btn-update',
            btnDelete: '.btn-delete'
        }, configs);

        this.initForms();
        this.initButtons();

    }//constructor

    initForms(){

        this.formCreate = document.querySelector(this.options.formCreate);

        this.formCreate.save().then(json => {
      
          window.location.reload();
      
        }).catch(err =>{
      
          console.log(err);
      
        });//form create save 
      
        this.formUpdate = document.querySelector(this.options.formUpdate);
      
        this.formUpdate.save().then(json => {
      
            window.location.reload();
      
          }).catch(err =>{
      
            console.log(err);
      
          });//form create save

    }//init forms

    fireEvent(name, args) {

        if (typeof this.options.listeners[name] === 'function') this.options.listeners[name].apply(this, args);

    }

    initButtons(){
    
    [...document.querySelectorAll(this.options.btnUpdate)].forEach(btn =>{

    btn.addEventListener('click', a =>{

        this.fireEvent('beforeUpdateClick', [e]);
  
  let tr = e.path.find(el =>{

    return(el.tagName.toUpperCase() === 'TR');

  });//let tr

  let data = JSON.parse(tr.dataset.row);

  for (let name in data) {

    let input = this.formUpdate.querySelector(`[name=${name}]`);

    switch (name) {

      case 'date':
      if(input) input.value = moment(data[name]).format('YYYY-MM-DD');
      default:
      if(input) input.value = data[name];

    }//switch

  }//form

  this.fireEvent('afterUpdateClick', [e]);

});//event listener

});//query selector all 

  [...document.querySelectorAll(this.options.btnDelete)].forEach(btn => {

    btn.addEventListener('click', e=> {

      let tr = e.path.find(el =>{

        return(el.tagName.toUpperCase() === 'TR');

      });//let tr

      let data = JSON.parse(tr.dataset.row);

      if (confirm(eval('`'+this.options.deleteMsg+'`'))) {

        fetch(eval('`'+this.options.deleteUrl+'`'), {
        method: 'DELETE'
      })

        .then(response => response.json())
        .then(json =>{

          window.location.reload();

        });//then

      }//if confirm

    });//add event listener

  });//document query selector all 

    }//init

}//class