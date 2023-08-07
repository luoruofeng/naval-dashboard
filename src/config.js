// config.js
const API_BASE_URL = 'http://localhost:8080'; // Update with your actual server URL
const K8S_DASHBOARD_URL = "http://127.0.0.1:6779/api/v1/namespaces/kubernetes-dashboard/services/http:kubernetes-dashboard:/proxy/#/discovery?namespace=default"
const MONITORING_URL = "http://localhost:9090/graph"
const LOG_URL = "http://localhost:5601/app/logs"
export { API_BASE_URL ,K8S_DASHBOARD_URL,MONITORING_URL,LOG_URL};
