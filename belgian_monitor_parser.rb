require 'nokogiri'
require 'open-uri'
require 'uri'

class BelgianMonitorParser

  def self.normalize_enterprise_number enterprise_number
    "#{enterprise_number}".gsub(/\D/, "").to_i
  end

  def build_url enterprise_number
    "http://www.ejustice.just.fgov.be/cgi_tsv/tsv_l_1.pl?lang=fr&sql=btw+contains+%27#{enterprise_number}%27&fromtab=TSV&rech=1&pdda=&pddm=&pddj=&pdfa=&pdfm=&pdfj=&naam=&postkode=&localite=&numpu=&hrc=&akte=&btw=#{enterprise_number}&jvorm=&land=&set2=&set3="
  end

  def extract_document_meta doc
    parts = doc.children.reject{ |node| node.name == 'br' }.slice(5..-1)
    title = "#{parts[0]}".strip
    published_at = Date.parse "#{parts[1]}".strip[0..10]
    link_node = doc.at_css('a')
    link = URI.join(@search_url, "#{link_node['href']}") if link_node
    {
      title: title,
      published_at: published_at,
      link: link
    }
  end

  def search_documents enterprise_number
    @search_url = build_url(enterprise_number)
    doc = Nokogiri::HTML(open(@search_url))
    doc.css('center table tr td:nth-child(2)').map(&method(:extract_document_meta))
  end
end
