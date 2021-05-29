using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace SignalR_Angular.HubConfig
{
    public class MyHub: Hub
    {
        public async Task AskServer(string textFromClient)
        {
            var output = textFromClient == "hey" ? "message was \"hey\"" : "message was something else";
            await Clients.All.SendAsync("askServerResponse",output);
        }
    }
}