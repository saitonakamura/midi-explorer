namespace MidiExplorer.Core

module Types =
    type Message = { Note: int }

    type Track =
        { Name: string
          Messages: Message list }

    type Song =
        { Title: string
          Artist: string
          Tracks: Track list }
