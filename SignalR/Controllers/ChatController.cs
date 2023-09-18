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
            private static  List<string> msgSaver = new List<string>();
          

            public ChatController(IHubContext<ChatHubs> hubContext)
            {
                _hubContext = hubContext;
            }

            [Route("send")]  //path looks like this: https://localhost:44379/api/chat/send
            [HttpPost]
            public IActionResult SendRequest([FromBody] MessageDto msg)
            {
                //if i use 'asshole' in my text message , signalhub take it all message and after repeating 5 times
                //send all 5 message and clear stack
                if (msg.msgText.Contains("asshole")) { msgSaver.Add(msg.msgText); }
                if (msgSaver.Count() >= 5)
                {
                    _hubContext.Clients.All.SendAsync("ReceiveRudChatMessage", msgSaver);
                    msgSaver.Clear();
                }

                //chat message that send to chat hub as usual chat behavior 
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
