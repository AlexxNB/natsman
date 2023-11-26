import eventbus from '#lib/eventbus';

export default function(value) {
  eventbus.emit('logger:add', value);
}
