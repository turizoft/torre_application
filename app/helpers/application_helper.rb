module ApplicationHelper
  def svg_icon(name, options = {})
    options[:class] ||= ''
    options[:class] += ' fill-current flex-shrink-0'
    inline_svg_pack_tag "media/images/icons/#{name}.svg", options
  end
end
