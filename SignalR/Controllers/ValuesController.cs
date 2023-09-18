using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace SignalR.Controllers
{
    // there is an api , that when i calle it , the api counter, count up
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        [HttpGet]
        public ActionResult<Value> GetValues()
        {
            counter.userCounter += 1;
            return new Value() { id = 1, valueName = "valueName" };
        }
    }

    public class Value
    {
        public int id { get; set; }
        public string? valueName { get; set; }

    }

    public static class counter
    {
        public static int userCounter { get; set; }
    }
}
