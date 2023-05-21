using OnlineExam.Common;
using System.Web.Mvc;

namespace OnlineExam.Areas.Exam.Controllers
{
    [SessionActionFilters]
    public class ExamDashBoardController : Controller
    {
        // GET: Exam/ExamDashBoard
        public ActionResult Index()
        {
            return View();
        }
    }
}