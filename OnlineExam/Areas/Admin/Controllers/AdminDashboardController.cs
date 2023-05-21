using OnlineExam.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OnlineExam.Areas.Admin.Controllers
{
    [SessionActionFilters]
    public class AdminDashboardController : Controller
    {
        // GET: Admin/AdminDashboard
        public ActionResult Index()
        {
            return View();
        }
    }
}