namespace SignalR.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.SignalR;
    using SignalR.Hub;

    namespace Public_Chat.Controllers
    {
        [Route("api/chat")]
        [ApiController]
        public class ChatController : ControllerBase
        {
            private readonly IHubContext<ChatHubs> _hubContext;
          

            public ChatController(IHubContext<ChatHubs> hubContext)
            {
                _hubContext = hubContext;
            }

            [Route("send")]                                           //path looks like this: https://localhost:44379/api/chat/send
            [HttpPost]
            public IActionResult SendRequest([FromBody] MessageDto msg)
            {
              
                _hubContext.Clients.All.SendAsync("ReceiveChatMessage", msg.user, msg.msgText);
                return Ok();
            }
        }

        public class MessageDto
        {
            public string user { get; set; }
            public string msgText { get; set; }
        }
    }
}
