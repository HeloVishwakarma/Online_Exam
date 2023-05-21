using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace OnlineExam.Common
{
    public class SessionActionFilters : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            //HttpContext.Current.Session["CollegeId"] = 640;
            //HttpContext.Current.Session["RegistrationDetailsId"] = 936368;
            //HttpContext.Current.Session["StudentRegistrationId"] = 697296;
            if (HttpContext.Current.Session["Status"] == null)
            {
                //return RedirectToAction("Apply", "Registration", new { CollegeCode = "" });
                //filterContext.Result = new RedirectResult("/Registration/Apply/" + Token.GetCollegeCode);
                //filterContext.Result = new RedirectResult("/Registration/UserLogout");
                filterContext.Result = new RedirectToRouteResult(new RouteValueDictionary { { "controller", "LoginRegistration" }, { "action", "UserLogout" }, { "area", "" } });
            }
            //base.OnActionExecuting(filterContext);
        }
    }
}