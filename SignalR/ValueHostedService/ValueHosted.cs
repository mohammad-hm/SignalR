namespace SignalR.ValueHostedService
{
    namespace SignalRDemo
    {
        using Microsoft.AspNetCore.SignalR;
        using Microsoft.Extensions.Hosting;
        using Microsoft.Extensions.Logging;
        using System;
        using System.Threading;
        using System.Threading.Tasks;
        using SignalR.Hub;
        using SignalR.Controllers;

        // when ever a user call 'valuescontroller' a counter , count up , and
        // here send msg to hub and tell hub the counter of calling 'value' api
        public class ValueHosted : IHostedService, IDisposable
        {
            private readonly ILogger<ValueHosted> _logger;
            private Timer _timer;
            private readonly IHubContext<ValuHub> _hubContext;

            public ValueHosted(ILogger<ValueHosted> logger, IHubContext<ValuHub> hubContext)
            {
                _logger = logger;
                _hubContext = hubContext;
            }

            public Task StartAsync(CancellationToken cancellationToken)
            {
                _logger.LogInformation("MessageSenderHostedService is starting.");

                // Create a timer that calls the SendMessage method every 30 seconds
                _timer = new Timer(SendMessage, null, TimeSpan.Zero, TimeSpan.FromSeconds(30));

                return Task.CompletedTask;
            }

            public void SendMessage(object state)
            {
                // Replace this with the message you want to send
                var message = string.Format("{0}", counter.userCounter);
              

                // Send the message to the SignalR hub
                _hubContext.Clients.All.SendAsync("ReceiveMessage", message);

                _logger.LogInformation("user count that called:{0}",message);
            }

            public Task StopAsync(CancellationToken cancellationToken)
            {
                _logger.LogInformation("MessageSenderHostedService is stopping.");

                // Dispose of the timer
                _timer?.Change(Timeout.Infinite, 0);
                return Task.CompletedTask;
            }

            public void Dispose()
            {
                _timer?.Dispose();
            }
        }

    }

}
