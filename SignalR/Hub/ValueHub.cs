namespace SignalR.Hub
{
    using Microsoft.AspNetCore.SignalR;
    using System.Threading.Tasks;

    public class ValuHub : Hub
    {
        public async Task SendMessage(string message)
        {
            //"ReceiveMessage" this is method name that in front side called
            await Clients.All.SendAsync("ReceiveMessage", message);
        }
    }
}
