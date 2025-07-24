import { apiRoutes } from "../../../globalConstants.js";
import apiRequest from "../../../utils/api.js";
import { loadTemplate } from "../../../utils/loadtemplate.js";

class Dashboard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.templateContent = null
    }; 

    async connectedCallback() {
        this.templateContent = await loadTemplate("../../Public/templates/pages/dashboard.html");
        this.render();
        this.addChart();
        this.CircularGraph(); 
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
            people_awared : 69
        }
        progress_container.style.background = `conic-gradient(#602BF8 0% ${progress_data.people_awared}%, #e5e7eb 0%)`; 
        progress_text.innerHTML = `${progress_data.people_awared}%`; 
    }; 
    addChart() {
        const StatsMockData = {
            labels: [
                "Jul 1", "Jul 2", "Jul 3", "Jul 4", "Jul 5",
                "Jul 6", "Jul 7", "Jul 8", "Jul 9", "Jul 10"
            ],
            // values: [25, 80, 75, 20, 95, 30, 45, 65, 30, 85]
            values: [4 ,5 ,4 ,4 ,4 ,4 ,9 ,4 ,4 ,4 ,4 ,5,4 ,4 ,4]
        }
        // selecting the chart from the shadowdom
        const ctx = this.shadowRoot.querySelector('.mygraph');
        //  accessing as a global var 
        const Chart = window.Chart;

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: StatsMockData.labels,
                datasets: [{
                    label: '',
                    data:StatsMockData.values,
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