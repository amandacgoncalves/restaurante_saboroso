class HcodeGrid {

    constructor(configs){

        configs.listeners = Object.assign({
        
            afterUpdateClick:(e) => {
        
                $('modal-update').modal('show');
        
              },//after update click

            afterDeleteClick:(e) => {
        
                window.location.reload();
        
              },//after update click

            afterFormCreate: (e) => {

                window.location.reload();

            }, //after form create

            afterFormUpdate: (e) => {

                window.location.reload();
                
            },

            afterFormCreateError: (e) => {

                alert('Não foi possível enviar o formulário.')

            },

            afterFormUpdateError: (e) => {

                alert('Não foi possível enviar o formulário.')

            }
        
        }, configs.listeners);


        this.options = Object.assign({}, {
            formCreate: '#modal-create form',
            formUpdate: '#modal-update form',
            btnUpdate: '.btn-update',
            btnDelete: '.btn-delete',
            onUpdateLoad: (form, name, data) => {

              let input = form.querySelector('[name='+name+']');

              if (input) input.value = data[name];

            }//on update load
        }, configs);

        this.initForms();
        this.initButtons();

    }//constructor

    initForms(){

        this.formCreate = document.querySelector(this.options.formCreate);

        this.formCreate.save().then(json => {
      
          this.fireEvent('afterFormCreate');
      
        }).catch(err =>{
      
            this.fireEvent('afterFormCreateError');
      
        });//form create save 
      
        this.formUpdate = document.querySelector(this.options.formUpdate);
      
        this.formUpdate.save().then(json => {
      
            this.fireEvent('afterFormUpdate');
      
          }).catch(err =>{
      
            this.fireEvent('afterFormUpdateError');
      
          });//form create save

    }//init forms

    fireEvent(name, args) {

        if (typeof this.options.listeners[name] === 'function') this.options.listeners[name].apply(this, args);

    }

    getTrData(e) {

        let tr = e.path.find(el =>{

            return(el.tagName.toUpperCase() === 'TR');
        
          });//let tr
        
          return JSON.parse(tr.dataset.row);

    }

    initButtons(){
    
    [...document.querySelectorAll(this.options.btnUpdate)].forEach(btn =>{

    btn.addEventListener('click', a =>{

        this.fireEvent('beforeUpdateClick', [e]);

        let data = this.getTrData(e);

  for (let name in data) {

    this.options.onUpdateLoad(this.formUpdate, name, data);

  }//form

  this.fireEvent('afterUpdateClick', [e]);

});//event listener

});//query selector all 

  [...document.querySelectorAll(this.options.btnDelete)].forEach(btn => {

    btn.addEventListener('click', e=> {

        this.fireEvent('beforeDeleteClick');

        let data = this.getTrData(e);

      if (confirm(eval('`'+this.options.deleteMsg+'`'))) {

        fetch(eval('`'+this.options.deleteUrl+'`'), {
        method: 'DELETE'
      })

        .then(response => response.json())
        .then(json =>{

        this.fireEvent('afterDeleteClick');

        });//then

      }//if confirm

    });//add event listener

  });//document query selector all 

    }//init

}//class