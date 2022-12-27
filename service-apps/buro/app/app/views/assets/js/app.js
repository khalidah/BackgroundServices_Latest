var vue =  new Vue({
	el:'#app',
        data:{
	 services:[
		{id:'buro-tab-collection',sr:'buro-status',res:'res-buro',name:'Buro Tab Collection'},
		{id:'buro-south-tab-collection',sr:'buro-south-status',res:'res-buro-south',name:'Buro South Tab Collection'},
		{id:'buro-north-tab-collection',sr:'buro-north-status',res:'res-buro-north',name:'Buro North Tab Collection'},
		{id:'dsk-tab-collection',sr:'dsk-status',res:'res-dsk',name:'Dsk Tab Collection'},
		{id:'verc-tab-collection',sr:'verc-status',res:'res-verc',name:'Verc Tab Collection'},
		{id:'addin-tab-collection',sr:'addin-status',res:'res-addin',name:'Addin Tab Collection'},
		{id:'bfk-tab-collection',sr:'bfk-status',res:'res-bfk',name:'BKF Tab Collection'}
			
		],
		dailyProcess:[
			{id:'buro-daily-process',sr:'buro-daily',res:'res-buro-daily',name:'Buro Daily'},
			{id:'buro-south-daily-process',sr:'buro-south-daily',res:'res-buro-south-daily',name:'Buro South Daily'},
			{id:'buro-north-daily-process',sr:'buro-north-daily',res:'res-buro-north-daily',name:'Buro North Daily'},
			{id:'dsk-daily-process',sr:'dsk-daily',res:'res-dsk-daily',name:'Dsk Daily'},
			{id:'verc-daily-process',sr:'verc-daily',res:'res-verc-daily',name:'Verc Daily'},
			{id:'addin-daily-process',sr:'addin-daily',res:'res-addin-daily',name:'Addin Daily'},
			{id:'bkf-daily-process',sr:'bkf-daily',res:'res-bkf-daily',name:'Bkf Daily'},
		],
		bkash:[
			{id:'buro-bkash',sr:'buro-bkash',res:'res-buro-bkash',name:'Buro Bkash'},
			{id:'buro-south-bkash',sr:'buro-south-bkash',res:'res-buro-south-bkash',name:'Buro South Bkash'},
			{id:'buro-north-bkash',sr:'buro-north-bkash',res:'res-buro-north-bkash',name:'Buro North Bkash'},
		],
	 socket:null,
	 detail:null,
	 textArea:null,
	 serviceElm:null,
	 time1:null,
	 time2:null
	},
	mounted(){
		console.log('okay');
		this.socket = io.connect('http://192.192.192.191:8080'); 
		this.loadStats();
		window.addEventListener('beforeunload',this.unload,{capture: true});
	},
	methods:{
		unload(event){
			console.log(event);
			event.preventDefault();
			if(this.socket){
				this.socket.emit('end');
			}
		},
	loadStats(){
		if(this.socket){
			this.serviceTrace('services');
			this.serviceTrace('dailyProcess');
			this.serviceTrace('bkash');
		}
	},
	serviceTrace(serviceName){
		for(s in this[serviceName]){
			const service = this[serviceName][s];
			const dom = this.$refs[service.id][0];
			
			if(this.textArea){
				console.log(textArea)
				this.textArea.scrollTop = this.textArea.scrollHeight;
			}
			this.socket.emit(service.sr);
			this.socket.on(service.res,data=>{
				
				dom.value=data;
				this.changeCss(data,dom,'bg');
				
				if(this.detail && this.detail.id==service.id){
					console.log(this.detail.id, service);
					this.textArea.value=data;
					this.changeCss(data,this.serviceElm,'bg')
					this.changeCss(data,this.textArea,'text')
					this.textArea.scrollTop = this.textArea.scrollHeight;
				}
			});
		}
	},
	changeCss(data,dom,type){
		 
		 if(data.match(/Exception/g)){
				dom.classList.remove('bg-live');
                dom.classList.remove(type+'-success');
                dom.classList.add(type+'-danger');
        }else{
                dom.classList.remove(type+'-danger');
				
				if(type=='bg'){
					console.log('here')
					this.time1 = setTimeout(()=>{
						dom.classList.remove('bg-live')
						dom.classList.add('bg-success');
					this.time2=	setTimeout(()=>{
							dom.classList.remove('bg-success');
							dom.classList.add('bg-live');
							},250);
					},250);
					
				}else{
                	dom.classList.add('text-success');
				}
        }
	},
	showDetail(service){
		this.detail=service;
		setTimeout(()=>{
			this.textArea = this.$refs['txtDetail'];
			this.serviceElm = this.$refs['service'];
			
			this.textArea.value="Loading..."
			console.log(this.textArea)
		},50)
		
	},
	close(){
		this.detail=null;
		this.textArea=null;
		this.serviceElm=null;
		clearTimeout(this.time2);
		clearTimeout(this.time1);
		window.location.reload();
	}
	},
	
});


