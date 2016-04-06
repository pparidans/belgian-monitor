Bundler.require
require_relative './belgian_monitor_parser'

parser = BelgianMonitorParser.new
enterprise_number = BelgianMonitorParser::normalize_enterprise_number(ARGV.first)

puts parser.search_documents(enterprise_number).inspect
