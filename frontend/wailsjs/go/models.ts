export namespace main {
	
	export class Board {
	    uuid: string;
	    description: string;
	    background_url: string;
	    date: string;
	
	    static createFrom(source: any = {}) {
	        return new Board(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.uuid = source["uuid"];
	        this.description = source["description"];
	        this.background_url = source["background_url"];
	        this.date = source["date"];
	    }
	}

}

