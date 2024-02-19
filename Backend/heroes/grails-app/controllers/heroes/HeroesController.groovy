package heroes


import grails.rest.*
import grails.converters.*

class HeroesController extends RestfulController {
    static responseFormats = ['json', 'xml']
    HeroesController() {
        super(Heroes)
    }

    def index(){
         respond Heroes.list();
    }
}
