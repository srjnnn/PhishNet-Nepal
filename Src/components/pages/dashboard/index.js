import { apiRoutes } from "../../../globalConstants.js";
import apiRequest from "../../../utils/api.js";
import Common from "../../../utils/common.js";
import { loadTemplate } from "../../../utils/loadtemplate.js";

class Dashboard extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({ mode: "open" });
        this.templateContent = null
        this.labels = null;
        this.values = null;
    }; 

    async connectedCallback() {
        this.templateContent = await loadTemplate("../../Public/templates/pages/dashboard.html");
        this.render();
        this.CircularGraph(); 
        this.getData();

    }; 
    render() {
        this.shadowRoot.innerHTML = this.templateContent;
        this.addEventListeners();
    }; 
    addEventListeners() {

    }; 
    CircularGraph(){
        const progress_container = this.shadowRoot.querySelector('.outercircle'); 
        const progress_text = this.shadowRoot.querySelector('.circular-graph-data-text')
        const progress_data = {
            people_awared : Common.randomNumber()
        }
        progress_container.style.background = `conic-gradient(#602BF8 0% ${progress_data.people_awared}%, #e5e7eb 0%)`; 
        progress_text.innerHTML = `${progress_data.people_awared}%`; 
    }; 

    getData(){
        const loading = Common.loadingTemplate("Fetching Stats.................");
        this.shadowRoot.append(loading);
         apiRequest(apiRoutes.dashboard.getStatsData,"GET")
        .then((response)=>{
            this.labels = response.data[0].data.labels;
            this.values = response.data[0].data.values;
            this.addChart();
            loading.remove();
        })
    }
    addChart() {
        const ctx = this.shadowRoot.querySelector('.mygraph');

        const Chart = window.Chart;

        new Chart(ctx, {
            type: 'line',
            data: {
                labels:this.labels ,
                datasets: [{
                    label: '',
                    data:this.values,
                    borderColor: '#6c3cff',
                    backgroundColor: '#6c3cff',
                    pointRadius: 4,
                    pointHoverRadius: 5,
                    fill: false,
                    tension: 0.2,
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                devicePixelRatio: 2,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        suggestedMax: 25
                    }
                }
            }
        });
    }
}
const dashboard = customElements.define("my-dashboard", Dashboard);
export default dashboard;