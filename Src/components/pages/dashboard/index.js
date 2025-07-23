import { apiRoutes } from "../../../globalConstants.js";
import apiRequest from "../../../utils/api.js";
import { loadTemplate } from "../../../utils/loadtemplate.js";

class Dashboard extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode : "open"});
        this.templateContent = null
    }

    async connectedCallback(){
        this.templateContent = await loadTemplate("../../Public/templates/pages/dashboard.html");
        this.render();
        this.addChart();
    }
    render(){
        this.shadowRoot.innerHTML = this.templateContent;
        this.addEventListeners();
    }
    addEventListeners(){
        
    }
    addChart(){
        // selecting the chart from the shadowdom
         const ctx = this.shadowRoot.querySelector('.mygraph');
        //  accessing as a global var 
         const Chart = window.Chart;
         
        new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array(20).fill('Date'),
            datasets: [{
                label: '',
                data: [
                    25, 80, 75, 20, 95, 30, 45, 65, 30, 85,
                    50, 100, 95, 100, 85, 75, 20, 90, 60, 30
                ],
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
                    suggestedMax: 125
                }
            }
        }
    });
    }
}
const dashboard = customElements.define("my-dashboard",Dashboard);
export default dashboard;