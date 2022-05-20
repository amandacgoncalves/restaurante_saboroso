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
            btnUpdate: 'btn-update',
            btnDelete: 'btn-delete',
            onUpdateLoad: (form, name, data) => {

              let input = form.querySelector('[name='+name+']');

              if (input) input.value = data[name];

            }//on update load
        }, configs);

        this.rows = [...document.querySelector('table tbody tr')];

        this.initForms();
        this.initButtons();

    }//constructor

    initForms(){

        this.formCreate = document.querySelector(this.options.formCreate);

        this.formCreate.save({
          success: () => {
            this.fireEvent('afterFormCreate');
          },
          failure:() => {
            this.fireEvent('afterFormCreateError');
          }
        });//form create save
      
        this.formUpdate = document.querySelector(this.options.formUpdate);
      
        this.formUpdate.save({
          success: () =>{
            this.fireEvent('afterFormUpdate');
          },
          failure:() =>{
            this.fireEvent('afterFormUpdateError');
          }
        });//form update save

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

    btnUpdateClick(e) {

      this.fireEvent('beforeUpdateClick', [e]);

        let data = this.getTrData(e);

          for (let name in data) {

      this.options.onUpdateLoad(this.formUpdate, name, data);

  }//form

  this.fireEvent('afterUpdateClick', [e]);

    }

    btnDeleteClick(e) {

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


    }

    initButtons(){

      this.rows.forEach(row => {

        [...row.querySelectorAll('.btn')].forEach(btn => {

          btn.addEventListener('click', e => {

            if (e.target.classList.contains(this.options.btnUpdate)) {

              this.btnUpdateClick(e);

            } else if (e.target.classList.contains(this.options.btnDelete)) {

              this.btnDeleteClick(e);

            } else {

              this.fireEvent('buttonClick', [e.target, this.getTrData(e), e]);

            }

          });//e target class list

        });//row query selector all

      });//this rows for each

    }//init

}//class