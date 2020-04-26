using System.Collections.Generic;

namespace Core
{
    public class Track
    {
        public IReadOnlyCollection<Message> Messages { get; set; } = new List<Message>();
    }
}