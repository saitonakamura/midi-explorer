using System.Collections.Generic;

namespace Core
{
    public class Song
    {
        public string Title { get; set; }
        public string Artist { get; set; }
        public IReadOnlyCollection<Track> Tracks { get; set; } = new List<Track>();
    }
}