
namespace SignalR.Hub
{
    using Microsoft.AspNetCore.SignalR;
    public class ChatHubs : Hub
    {
        public async Task SendRudeMessage( List<string> message)
        {
            await Clients.All.SendAsync("ReceiveRudChatMessage", message);
        }
        public async Task SendChatMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveChatMessage", user, message);
        }
    }

}