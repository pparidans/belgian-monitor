Bundler.require
require_relative 'belgian_monitor_parser'

class Api < Sinatra::Base
  get '/api/v1/documents/:enterprise_number' do
    parser = BelgianMonitorParser.new
    enterprise_number = BelgianMonitorParser::normalize_enterprise_number(params[:enterprise_number])
    json parser.search_documents(enterprise_number)
  end
end

run Api
