import {PropinsisPage, PropinsiPage} from '../pages/propinsi';
import {KontrasepsiPage} from "../pages/kontrasepsi";
import {PemakaisPage,PemakaiPage} from '../pages/pemakai'
import {ErrorPage} from '../pages/error';


const routes = [
    {
        path: 'pem/:id',
        component: PemakaiPage
    },
    {
        path: '/pem/add',
        component: PemakaiPage
    },
    {
        path: '/pems',
        component: PemakaisPage
    },
    {
        path: '/prop/add',
        component: PropinsiPage
    },
    {
        path: '/prop/:id',
        component: PropinsiPage
    },
    {
        path: '/',
        component: PropinsisPage,
        exact: true
    },
    {
        path: "/kon/:id",
        component: KontrasepsiPage
    },
    {
        path: "/kons",
        component: KontrasepsiPage
    },
    {
        path: '*',
        component: ErrorPage,
        props: {
            code: 404
        }
    }
];

export default routes;

