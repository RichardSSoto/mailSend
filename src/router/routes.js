
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: "/MP",
    // name: "MpGraphs",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "mpgraphs",
        component: () => import("pages/MpGraphs.vue"),
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: "/SP",
    // name: "SpGraphs",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "spgraphs",
        component: () => import("pages/SpGraphs.vue"),
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: "/SUF",
    // name: "SufGraphs",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "sufgraphs",
        component: () => import("pages/SufGraphs.vue"),
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: "/DAFO",
    // name: "DafoGraphs",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "dafographs",
        component: () => import("pages/DafoGraphs.vue"),
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: "/RMWT",
    // name: "RmwtGraphs",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "rmwtgraphs",
        component: () => import("pages/RmwtGraphs.vue"),
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: "/Employes",
    // name: "Employes",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "employespage",
        component: () => import("pages/Employes.vue"),
        meta: {
          requiresAuth: true
        }
      }
    ]
  },

  // {
  //   path: '/',
  //   component: () => import('layouts/QualityFormLayout.vue'),
  //   children: [
  //     {
  //       path: "",
  //       component: () => import("pages/QualityForm/Index.vue")
  //     }
  //   ]
  // },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
