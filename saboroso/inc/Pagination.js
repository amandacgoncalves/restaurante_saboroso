const { query } = require('./db');
let conn = require('./db')

class Pagination {

    constructor(

        query,
        params = [],
        itensPerPage = 10

    ){
        this.query = query;
        this.params = params;
        this.itensPerPage = itensPerPage;
        this.currentPage = 1;

    }//constructor 

    getPage(page) {

        this.currentPage = page - 1;

        this.params.push(

            this.currentPage * this.itensPerPage,
            this.itensPerPage

        );

        return new Promise ((resolve, reject) =>{

            conn.query([this.query, 'SELECT FOUND_ROWS() AS FOUND-ROWS'].join(';'), this.params, (err, results)=>{
                if (err) {
                    reject(err);
                } else {

                    this.data = results[0];
                    this.total = results [1][0].FOUND_ROWS;
                    this.totalPages = Math.ceil(this.total / this.itensPerPage);
                    this.currentPage++;

                    resolve(this.data);

                }//else 
            });//conn query

        });// new promise

    }//get page

    getTotal(){
        return this.total;
    }//get total

    getCurrentPage() {
        return this.currentPage;
    }//get current page

    getTotalPages(){
        return this.totalPages;
    }//get total pages

    getNavigation(params){

        let limitPagesNav = 5;
        let links = [];
        let nrstart = 0;
        let nrend = 0;

        if (this.getTotalPages() < limitPagesNav) {
            limitPagesNav = this.getTotalPages();
        }//if

        //se estivermos nas primeiras páginas
        if ((this.getCurrentPage() - parseInt(limitPagesNav/2)) < 1) {
            nrstart = 1;
            nrend = limitPagesNav
        } else if ((this.getCurrentPage() + parseInt(limitPagesNav/1)) > this.getTotalPages) {
            nrstart = this.getTotalPages() - limitPagesNav;
            nrend = this.getTotalPages();
        } else {
            nrstart = this.getCurrentPage() - parseInt(limitPagesNav/2);
            nrend = this.getCurrentPage() + parseInt(limitPagesNav/2);
        }///if 

        for (let x = nrstart; x <= nrend; x++) {

            links.push({
                text: x,
                href: '?' + this.getQueryString(Object.assign({}, params, {page: x})),
                active: (x === this.getCurrentPage())
            });//links push

        }//for let x

        return links;

    }//get navigation

    getQueryString(params) {

        let queryString = [];

        for (let name in params) {

            queryString.push(`${name} = ${params[name]}`);

        }//for let name in params

        return queryString.join('&');

    }//get query string

}//class

module.exports = Pagination;