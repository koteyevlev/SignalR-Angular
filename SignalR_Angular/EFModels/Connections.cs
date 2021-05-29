using System;
using System.Collections.Generic;

#nullable disable

namespace SignalR_Angular.EFModels
{
    public partial class Connections
    {
        public int Id { get; set; }
        public int PersionId { get; set; }
        public string SignalrId { get; set; }
        public DateTime? TimeStamp { get; set; }
    }
}
