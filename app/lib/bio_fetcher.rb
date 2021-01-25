class BioFetcher
  def self.fetch(username)
    new(username: username).fetch
  end

  def initialize(username:)
    @username = username
  end

  def fetch
    uri = URI("https://bio.torre.co/api/bios/#{@username}")
    response = Net::HTTP.get_response(uri)
    # TODO: timeout for read/write is 60s for net/http, handle slow requests
    # TODO: add a circuit breaker

    raise InvalidResponse if response.content_type != 'application/json'
    raise InvalidResponse if response.body.blank?
    raise InvalidResponse if response.code != '200'

    begin
      JSON.parse(response.body)
    rescue JSON::ParserError
      raise InvalidResponse
    end
  end

  class InvalidResponse < StandardError; end
end
