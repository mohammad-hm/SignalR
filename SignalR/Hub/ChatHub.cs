
namespace SignalR.Hub
{
    using Microsoft.AspNetCore.SignalR;
    public class ChatHubs : Hub
    {
        public async Task SendChatMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveChatMessage", user, message);
        }
    }
}